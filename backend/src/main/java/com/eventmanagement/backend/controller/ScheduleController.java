package com.eventmanagement.backend.controller;

import com.eventmanagement.backend.dto.ScheduleRequest;
import com.eventmanagement.backend.entity.Schedule;
import com.eventmanagement.backend.service.ScheduleService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = {
//        "http://localhost:5173",
//        "http://localhost:5174"
//})
@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(
            ScheduleService scheduleService) {

        this.scheduleService = scheduleService;
    }

    @PostMapping
    @PreAuthorize(
            "hasAnyRole('ADMIN','ORGANIZER')")
    public String addSchedule(
            @RequestBody ScheduleRequest request) {

        return scheduleService
                .addSchedule(request);
    }

    @GetMapping("/event/{eventId}")
    public List<Schedule> getSchedules(
            @PathVariable Long eventId) {

        return scheduleService
                .getSchedules(eventId);
    }

    @PutMapping("/{scheduleId}")
    @PreAuthorize(
            "hasAnyRole('ADMIN','ORGANIZER')")
    public String updateSchedule(
            @PathVariable Long scheduleId,
            @RequestBody ScheduleRequest request) {

        return scheduleService
                .updateSchedule(
                        scheduleId,
                        request);
    }

    @DeleteMapping("/{scheduleId}")
    @PreAuthorize(
            "hasAnyRole('ADMIN','ORGANIZER')")
    public String deleteSchedule(
            @PathVariable Long scheduleId) {

        return scheduleService
                .deleteSchedule(scheduleId);
    }
}