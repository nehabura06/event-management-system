package com.eventmanagement.backend.service;

import com.eventmanagement.backend.dto.EventRequest;
import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.repository.EventRepository;
import com.eventmanagement.backend.repository.RegistrationRepository;
import org.springframework.stereotype.Service;
import com.eventmanagement.backend.enums.EventCategory;
import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.repository.UserRepository;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final RegistrationRepository registrationRepository;

    public EventService(EventRepository eventRepository,
                        UserRepository userRepository,
                        RegistrationRepository registrationRepository) {
        this.eventRepository =
                eventRepository;
        this.userRepository =
                userRepository;
        this.registrationRepository =
                registrationRepository;
    }

    public String createEvent(EventRequest request,
                              String email) {

        User user = userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(

                                        "User not found"));
//         Add validation here
        if (request.getEndDate() == null) {

            throw new RuntimeException(
                    "End date is required");
        }
        if (request.getEndDate()
                .isBefore(
                        request.getDate())) {

            throw new RuntimeException(
                    "End date cannot be before start date");
        }

        System.out.println("Received capacity: "
                + request.getCapacity());
        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .venue(request.getVenue())
                .date(request.getDate())
                .endDate(request.getEndDate())
                .time(request.getTime())
                .capacity(request.getCapacity())
                .category(request.getCategory())
                .organizer(request.getOrganizer())
                .contactEmail(request.getContactEmail())
                .createdAt(LocalDateTime.now())
                .createdBy(user)
                .build();


        eventRepository.save(event);

        System.out.println("Saved capacity: "
                + event.getCapacity());

        return "Event created successfully";
    }
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    public Event getEventById(Long id) {

        return eventRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));
    }

    public String deleteEvent(Long id) {

        eventRepository.deleteById(id);

        return "Event deleted successfully";
    }

    public String updateEvent(Long id, EventRequest request) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (request.getEndDate() == null) {

            throw new RuntimeException(
                    "End date is required");
        }

        if (request.getEndDate()
                .isBefore(
                        request.getDate())) {

            throw new RuntimeException(
                    "End date cannot be before start date");
        }

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setVenue(request.getVenue());
        event.setDate(request.getDate());
        event.setEndDate(request.getEndDate());
        event.setTime(request.getTime());
        event.setCapacity(request.getCapacity());
        event.setCategory(request.getCategory());
        event.setOrganizer(
                request.getOrganizer());
        event.setContactEmail(
                request.getContactEmail());

        eventRepository.save(event);

        return "Event updated successfully";
    }

public List<Event> searchEvents(String keyword) {

    keyword = keyword.trim();

    LocalDate today = LocalDate.now();

    List<Event> results = new ArrayList<>();

    // Search by title
    eventRepository
            .searchUpcomingByTitle(
                    keyword,
                    today)
            .forEach(event -> {

                if (!results.contains(event)) {
                    results.add(event);
                }

            });

    // Search by venue
    eventRepository
            .searchUpcomingByVenue(
                    keyword,
                    today)
            .forEach(event -> {

                if (!results.contains(event)) {
                    results.add(event);
                }

            });

    // Search by category
    try {

        EventCategory category =
                EventCategory.valueOf(
                        keyword.toUpperCase());

        eventRepository
                .findByCategoryAndDateAfter(
                        category,
                        today)
                .forEach(event -> {

                    if (!results.contains(event)) {
                        results.add(event);
                    }

                });

    } catch (Exception e) {
        // Invalid category
    }

    return results;
}
    public List<Event> getByCategory(
            EventCategory category) {

        return eventRepository
                .findByCategory(category);
    }
    public List<Event> getByVenue(
            String venue) {

        return eventRepository
                .findByVenueContainingIgnoreCase(venue);
    }
    public List<Event> getUpcomingEvents() {

        return eventRepository
                .findByDateGreaterThanEqual(
                        LocalDate.now());
    }
    public List<Event> getMyEvents(
            String email) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));
//        return eventRepository
//                .findByCreatedBy(user);
        List<Event> events =
                eventRepository.findByCreatedBy(user);

        events.forEach(event -> {

            event.setRegistrationCount(

                    registrationRepository
                            .countByEvent(event)

            );

        });

        return events;
    }
}