package com.eventmanagement.backend.controller;

import com.eventmanagement.backend.dto.RegistrationRequest;
import com.eventmanagement.backend.service.RegistrationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.eventmanagement.backend.entity.Registration;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(
            RegistrationService registrationService) {

        this.registrationService =
                registrationService;
    }

    @PreAuthorize("hasRole('ATTENDEE')")
    @PostMapping
//    @PreAuthorize("hasRole('ATTENDEE')")
    public String registerForEvent(
            @RequestBody RegistrationRequest request,
            Authentication authentication) {

        return registrationService.registerForEvent(
                request,
                authentication.getName());
    }

    @GetMapping("/seats/{eventId}")
    public Long availableSeats(
            @PathVariable Long eventId) {

        return registrationService.getAvailableSeats(eventId);
    }

    @DeleteMapping("/{eventId}")
    @PreAuthorize("hasRole('ATTENDEE')")
    public String cancelRegistration(
            @PathVariable Long eventId,
            Authentication authentication) {

        return registrationService.cancelRegistration(
                eventId,
                authentication.getName());
    }

    @GetMapping("/my")
    public List<Registration> myRegistrations(
            Authentication authentication) {

        return registrationService
                .getMyRegistrations(
                        authentication.getName());
    }
    //
    @GetMapping("/check/{eventId}")
    @PreAuthorize("hasRole('ATTENDEE')")
    public boolean isRegistered(
            @PathVariable Long eventId,
            Authentication authentication) {

        return registrationService.isRegistered(
                eventId,
                authentication.getName());
    }

    @GetMapping("/organizer/count")
    @PreAuthorize(
            "hasRole('ORGANIZER')")
    public long getOrganizerCount(
            Authentication authentication) {

        return registrationService
                .getOrganizerRegistrations(
                        authentication.getName());
    }


    @GetMapping("/count/{eventId}")
    public long getEventCount(
            @PathVariable Long eventId) {

        return registrationService
                .getEventRegistrationCount(
                        eventId);
    }

    @GetMapping("/attendee/count")
    @PreAuthorize("hasRole('ATTENDEE')")
    public long getRegisteredCount(
            Authentication authentication) {

        return registrationService
                .getRegisteredEventsCount(
                        authentication.getName()
                );
    }

    @GetMapping("/attendee/upcoming")
    @PreAuthorize("hasRole('ATTENDEE')")
    public long getUpcomingCount(
            Authentication authentication) {

        return registrationService
                .getUpcomingRegisteredEventsCount(
                        authentication.getName()
                );
    }

    @GetMapping("/attendee/past")
    @PreAuthorize("hasRole('ATTENDEE')")
    public long getPastCount(
            Authentication authentication) {

        return registrationService
                .getPastRegisteredEventsCount(
                        authentication.getName()
                );
    }
}