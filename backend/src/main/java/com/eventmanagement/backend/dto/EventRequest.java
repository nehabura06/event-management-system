package com.eventmanagement.backend.dto;

import com.eventmanagement.backend.enums.EventCategory;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class EventRequest {

    private String title;

    private String description;

    private String venue;

    private LocalDate date;

    private LocalDate endDate;

    private LocalTime time;

    private Integer capacity;

    private EventCategory category;

    private String organizer;

    private String contactEmail;
}