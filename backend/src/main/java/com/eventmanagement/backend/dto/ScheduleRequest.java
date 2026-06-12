package com.eventmanagement.backend.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class ScheduleRequest {

    private Long eventId;

    private String sessionTitle;

    private String speakerName;

    private String description;

    private LocalTime startTime;

    private LocalTime endTime;
}