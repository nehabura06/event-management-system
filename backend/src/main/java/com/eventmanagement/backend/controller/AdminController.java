package com.eventmanagement.backend.controller;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.enums.Role;
import com.eventmanagement.backend.repository.EventRepository;
import com.eventmanagement.backend.repository.RegistrationRepository;
import com.eventmanagement.backend.repository.UserRepository;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;

    private final EventRepository eventRepository;

    private final RegistrationRepository registrationRepository;

    public AdminController(
            UserRepository userRepository,
            EventRepository eventRepository,
            RegistrationRepository registrationRepository) {

        this.userRepository =
                userRepository;

        this.eventRepository =
                eventRepository;

        this.registrationRepository =
                registrationRepository;
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {

        Map<String, Long> stats =
                new HashMap<>();

        stats.put(
                "users",
                userRepository.count());

        stats.put(
                "organizers",
                userRepository.countByRole(
                        Role.ORGANIZER));

        stats.put(
                "attendees",
                userRepository.countByRole(
                        Role.ATTENDEE));

        stats.put(
                "events",
                eventRepository.count());

        stats.put(
                "registrations",
                registrationRepository.count());

        return stats;
    }

    @GetMapping("/users")
    public List<User> getUsers() {

        return userRepository
                .findAll()
                .stream()
                .filter(user ->
                        user.getRole() != Role.ADMIN)
                .toList();
    }
    @DeleteMapping("/users/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        userRepository.deleteById(id);

        return "User deleted";
    }


    @GetMapping("/events")
    public List<Event> getAllEvents() {

        return eventRepository.findAll();
    }
    @DeleteMapping("/events/{id}")
    public String deleteEvent(
            @PathVariable Long id) {

        eventRepository.deleteById(id);

        return "Event deleted";
    }

    @GetMapping("/insights")
    public Map<String, Object> insights() {

        Map<String, Object> data =
                new HashMap<>();

        long upcomingEvents =
                eventRepository
                        .findByDateGreaterThanEqual(
                                LocalDate.now())
                        .size();

        long pastEvents =
                eventRepository
                        .findAll()
                        .stream()
                        .filter(event ->
                                event.getDate()
                                        .isBefore(
                                                LocalDate.now()))
                        .count();

        data.put(
                "upcomingEvents",
                upcomingEvents
        );

        data.put(
                "pastEvents",
                pastEvents
        );

        return data;
    }
}