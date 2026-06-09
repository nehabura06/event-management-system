package com.eventmanagement.backend.entity;

import com.eventmanagement.backend.enums.EventCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String venue;

    private LocalDate date;

    private LocalTime time;

    private Integer capacity;

    @Enumerated(EnumType.STRING)
    private EventCategory category;

    private LocalDateTime createdAt;
}