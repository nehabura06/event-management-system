package com.eventmanagement.backend.service;

import com.eventmanagement.backend.dto.EventRequest;
import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.repository.EventRepository;
import org.springframework.stereotype.Service;
import com.eventmanagement.backend.enums.EventCategory;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.util.List;



@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public String createEvent(EventRequest request) {

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .venue(request.getVenue())
                .date(request.getDate())
                .time(request.getTime())
                .capacity(request.getCapacity())
                .category(request.getCategory())
                .createdAt(LocalDateTime.now())
                .build();

        eventRepository.save(event);

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

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setVenue(request.getVenue());
        event.setDate(request.getDate());
        event.setTime(request.getTime());
        event.setCapacity(request.getCapacity());
        event.setCategory(request.getCategory());

        eventRepository.save(event);

        return "Event updated successfully";
    }

    public List<Event> searchByTitle(
            String title) {

        return eventRepository
                .findByTitleContainingIgnoreCase(title);
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
                .findByDateAfter(LocalDate.now());
    }
}