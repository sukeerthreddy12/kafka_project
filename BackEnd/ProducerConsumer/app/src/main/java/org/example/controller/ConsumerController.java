package org.example.controller;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumerController {

    private final Counter buyCourseCounter;
    private final Counter enrollNowCounter;

    public ConsumerController(MeterRegistry meterRegistry) {
        this.buyCourseCounter = Counter.builder("kafka_events_received_total")
                .description("Total number of Kafka events received")
                .register(meterRegistry);
        this.enrollNowCounter = Counter.builder("kafka_events_received_total")
                .description("Total number of Kafka events received")
                .register(meterRegistry);
    }

    @KafkaListener(topics = "test", groupId = "metrics-consumer-group")
    public void listen(String eventData) {
        System.out.println("Received event: " + eventData);
        buyCourseCounter.increment();

    }
    @KafkaListener(topics = "enroll-now", groupId = "enroll-now-consumer-group")
    public void listenEnrollNow(String eventData) {
        System.out.println("Enroll now event: " + eventData);
        enrollNowCounter.increment();
    }

}