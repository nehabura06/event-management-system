package com.eventmanagement.backend.service;

import com.eventmanagement.backend.dto.RegistrationRequest;
import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.entity.Registration;
import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.repository.EventRepository;
import com.eventmanagement.backend.repository.RegistrationRepository;
import com.eventmanagement.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import java.time.LocalDateTime;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public RegistrationService(
            RegistrationRepository registrationRepository,
            EventRepository eventRepository,
            UserRepository userRepository,
            EmailService emailService) {

        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.emailService =
                emailService;
    }

    public String registerForEvent(
            RegistrationRequest request,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Event event = eventRepository.findById(
                        request.getEventId())
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        long registeredCount =
                registrationRepository.countByEvent(event);

        if (registeredCount >= event.getCapacity()) {
            return "Event is full";
        }

        boolean alreadyRegistered =
                registrationRepository
                        .existsByUserAndEvent(
                                user,
                                event
                        );

        if (alreadyRegistered) {
            return "You are already registered for this event";
        }

        Registration registration =
                Registration.builder()
                        .user(user)
                        .event(event)
                        .registeredAt(
                                LocalDateTime.now())
                        .build();

        registrationRepository.save(registration);

        try {
            emailService.sendRegistrationEmail(
                    user.getEmail(),
                    event.getTitle(),
                    event.getDate().toString(),
                    event.getVenue()
            );
        } catch (Exception e) {
            System.out.println("Email sending failed: "
                    + e.getMessage());
        }

        return "Event registration successful";
    }
    public Long getAvailableSeats(Long eventId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        long registered =
                registrationRepository.countByEvent(event);

        System.out.println("Capacity = " + event.getCapacity());
        System.out.println("Registered = " + registered);
        return event.getCapacity() - registered;
    }

    public String cancelRegistration(
            Long eventId,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        Registration registration =
                registrationRepository
                        .findByUserAndEvent(
                                user,
                                event);

        if (registration == null) {
            return "Registration not found";
        }

        emailService.sendCancellationEmail(
                user.getEmail(),
                event.getTitle()
        );
        registrationRepository.delete(registration);

        return "Registration cancelled";
    }

    public List<Registration> getMyRegistrations(
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return registrationRepository
                .findByUser(user);
    }

    //
    public boolean isRegistered(
            Long eventId,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        return registrationRepository
                .existsByUserAndEvent(user, event);
    }

    public long getOrganizerRegistrations(
            String email) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        return registrationRepository
                .countByEvent_CreatedBy(user);
    }

    public long getEventRegistrationCount(
            Long eventId) {

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"));

        return registrationRepository
                .countByEvent(event);
    }
}