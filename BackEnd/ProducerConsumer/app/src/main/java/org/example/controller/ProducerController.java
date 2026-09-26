package org.example.controller;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;

@RestController
@RequestMapping("/producer")
public class ProducerController {
    private static final String BUY_TOPIC = "buy-course";
    private static final String ENROLL_TOPIC = "enroll-now";
    private static final String BOOTSTRAP_SERVERS = "172.22.38.113:9092";

    private final Producer<String, String> kafkaProducer;

    public ProducerController() {
        Properties props = new Properties();
        props.put("bootstrap.servers", BOOTSTRAP_SERVERS);
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        this.kafkaProducer = new KafkaProducer<>(props);
    }

    @PostMapping("/buy")
    public void sendBuyEvent(@RequestBody String eventData) {
        send(BUY_TOPIC, eventData);
    }

    @PostMapping("/enroll")
    public void sendEnrollEvent(@RequestBody String eventData) {
        send(ENROLL_TOPIC, eventData);
    }

    private void send(String topic, String eventData) {
        ProducerRecord<String, String> record = new ProducerRecord<>(topic, "userEvent", eventData);
        kafkaProducer.send(record, (metadata, exception) -> {
            if (exception != null) {
                System.err.println("Error sending message to Kafka: " + exception.getMessage());
            } else {
                System.out.println("Message sent to " + topic + ", offset: " + metadata.offset());
            }
        });
    }

}