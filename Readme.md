# MQTT Explorer – SparkplugB Edition

![image](https://github.com/user-attachments/assets/da9e2eca-bf64-43cc-9a2f-66111af58703)

🚀 This project is a **fork** of [MQTT Explorer](https://github.com/thomasnordquist/MQTT-Explorer), extended to add **SparkplugB protocol support**.

> **Note:** This fork is intended primarily for Proof of Concept (PoC) and experimental purposes. All core credits go to Thomas Nordquist.

## ✨ What's New in This Edition?

- Each **SparkplugB metric** now appears as a **special read-only MQTT node**.
- Metrics behave like regular MQTT messages:
  - You can **view their payloads**.
  - You can **include them in plots** and dashboards.
- Metrics are **read-only**: you cannot publish to them from the UI.
- **No topic collisions**: if a device already uses the same topic name, both nodes are displayed separately with **different title colors** for easy identification.

## ⚡ Important Notes

- This fork does **not modify** the general behavior of MQTT Explorer except for the SparkplugB improvements.
- The project remains licensed under [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/).

## 🙏 Credits

Based on the original work [MQTT Explorer](https://github.com/thomasnordquist/MQTT-Explorer) by Thomas Nordquist.

[![Forked from MQTT Explorer](https://img.shields.io/badge/forked%20from-MQTT%20Explorer-blue)](https://github.com/thomasnordquist/MQTT-Explorer)


