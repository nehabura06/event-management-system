package com.eventmanagement.backend.controller;

import com.eventmanagement.backend.dto.EventRequest;
import com.eventmanagement.backend.service.EventService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import com.eventmanagement.backend.enums.EventCategory;

import com.eventmanagement.backend.entity.Event;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','ORGANIZER')")
    @PostMapping
    public String createEvent(
            @RequestBody EventRequest request) {

        return eventService.createEvent(request);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Event getEventById(
            @PathVariable Long id) {

        return eventService.getEventById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteEvent(
            @PathVariable Long id) {

        return eventService.deleteEvent(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','ORGANIZER')")
    @PutMapping("/{id}")
    public String updateEvent(
            @PathVariable Long id,
            @RequestBody EventRequest request) {

        return eventService.updateEvent(id, request);
    }

//    @GetMapping("/search")
//    public List<Event> searchByTitle(
//            @RequestParam String title) {
//
//        return eventService
//                .searchByTitle(title);
//    }
@GetMapping("/search")
public List<Event> searchEvents(
        @RequestParam String keyword) {

    return eventService
            .searchEvents(keyword);
}
    @GetMapping("/category/{category}")
    public List<Event> getByCategory(
            @PathVariable EventCategory category) {

        return eventService
                .getByCategory(category);
    }
    @GetMapping("/venue/{venue}")
    public List<Event> getByVenue(
            @PathVariable String venue) {

        return eventService
                .getByVenue(venue);
    }
    @GetMapping("/upcoming")
    public List<Event> getUpcomingEvents() {

        return eventService
                .getUpcomingEvents();
    }
}