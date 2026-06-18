package com.eventmanagement.backend.entity;

import com.eventmanagement.backend.enums.EventCategory;
import jakarta.persistence.*;
import lombok.*;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

//    @Column(nullable = false)
    private LocalDate endDate;

    private LocalTime time;

    private Integer capacity;

    @Enumerated(EnumType.STRING)
    private EventCategory category;

    private String organizer;      // NEW

    private String contactEmail;   // NEW

    @ManyToOne
    @JoinColumn(name = "created_by")
    @JsonIgnoreProperties({
            "password"
    })
    private User createdBy;

    private LocalDateTime createdAt;

    @Transient
    private Long registrationCount;
}