package com.eventmanagement.backend.service;

import com.eventmanagement.backend.dto.FeedbackRequest;
import com.eventmanagement.backend.entity.*;
import com.eventmanagement.backend.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public FeedbackService(
            FeedbackRepository feedbackRepository,
            UserRepository userRepository,
            EventRepository eventRepository) {

        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public String submitFeedback(
            FeedbackRequest request,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Event event = eventRepository.findById(
                        request.getEventId())
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        boolean alreadySubmitted =
                feedbackRepository
                        .existsByUserAndEvent(
                                user,
                                event);

        if (alreadySubmitted) {
            return "Feedback already submitted";
        }

        Feedback feedback =
                Feedback.builder()
                        .rating(request.getRating())
                        .comment(request.getComment())
                        .submittedAt(LocalDateTime.now())
                        .user(user)
                        .event(event)
                        .build();

        feedbackRepository.save(feedback);

        return "Feedback submitted successfully";
    }
    public List<Feedback> getFeedbackByEvent(
            Long eventId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        return feedbackRepository.findByEvent(event);
    }
}