package com.eventmanagement.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackRequest {

    private Long eventId;

    private Integer rating;

    private String comment;
}