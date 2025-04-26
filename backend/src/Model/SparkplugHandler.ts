import { MqttMessage, MqttMessageMetric } from '../../../events'
import { Base64Message, Base64MessageDTO } from './Base64Message'
import { get } from 'sparkplug-payload'

export interface SparkplugMetric {
    name: string
    value: number | string | boolean | Uint8Array
    timestamp?: Date
}

export class SparkplugHandler {
    private spark = get('spBv1.0')
    private topicRe = /^spBv1\.0\/[^/]+\/[ND](?:DATA|CMD|DEATH|BIRTH)\/[^/]+(?:\/[^/]+)?$/u

    public isSparkplugTopic(topic: string): boolean {
        return this.topicRe.test(topic)
    }

    public getMetrics(msgDto: MqttMessage): MqttMessageMetric[] {
        try {
            const msg = new Base64Message(msgDto.payload!)
            const raw = new Uint8Array(msg.toBuffer())
            const decoded = this.spark!.decodePayload(raw)
            const list: any[] = decoded.metrics ?? []
            return list.map(m => {
                const name = m.Name ?? m.name
                const value = m.Value ?? m.value

                // Genera payload Base64MessageDTO
                const payloadDto: Base64MessageDTO =
                    value instanceof Uint8Array
                        ? Base64Message.fromBuffer(Buffer.from(value)).toJSON()
                        : Base64Message.fromString(String(value)).toJSON()
                const separator = '\u200B'
                return {
                    topic: `${msgDto.topic}/${separator}${name}`,
                    payload: payloadDto,
                    qos: 0,
                    retain: false,
                    messageId: undefined,
                    received: (msgDto as any).received as Date,
                    isMetric: true
                }
            })
        } catch {
            return []
        }
    }
}
