package com.eventmanagement.backend.controller;

import com.eventmanagement.backend.dto.FeedbackRequest;
import com.eventmanagement.backend.service.FeedbackService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.eventmanagement.backend.entity.Feedback;
import java.util.List;
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(
            FeedbackService feedbackService) {

        this.feedbackService = feedbackService;
    }

    @PreAuthorize("hasRole('ATTENDEE')")
    @PostMapping
    public String submitFeedback(
            @RequestBody FeedbackRequest request,
            Authentication authentication) {

        return feedbackService.submitFeedback(
                request,
                authentication.getName());
    }

//    @PreAuthorize("hasAnyRole('ADMIN','ORGANIZER')")
    @GetMapping("/event/{eventId}")
    public List<Feedback> getFeedbackByEvent(
            @PathVariable Long eventId) {

        return feedbackService.getFeedbackByEvent(eventId);
    }

    @GetMapping("/check/{eventId}")
    @PreAuthorize("hasRole('ATTENDEE')")
    public boolean hasFeedback(
            @PathVariable Long eventId,
            Authentication authentication) {

        return feedbackService
                .hasSubmittedFeedback(
                        eventId,
                        authentication.getName()
                );
    }
}

