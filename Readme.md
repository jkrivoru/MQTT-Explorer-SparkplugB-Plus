**This is a fork of [MQTT-Explorer](https://github.com/thomasnordquist/MQTT-Explorer) for extended support of SparkplugB data**

Each metric now appears as a special, read-only MQTT node. You can treat it like any other data message—view its payload, include it in plots, etc.—but you won’t be able to publish to it. In the unlikely event that a device already has a topic with the same name, it won’t collide: instead you’ll see two separate nodes, each differentiated by its title color.

![image](https://github.com/user-attachments/assets/da9e2eca-bf64-43cc-9a2f-66111af58703)


