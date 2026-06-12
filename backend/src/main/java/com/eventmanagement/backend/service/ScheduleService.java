package com.eventmanagement.backend.service;

import com.eventmanagement.backend.dto.ScheduleRequest;
import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.entity.Schedule;
import com.eventmanagement.backend.repository.EventRepository;
import com.eventmanagement.backend.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final EventRepository eventRepository;

    public ScheduleService(
            ScheduleRepository scheduleRepository,
            EventRepository eventRepository) {

        this.scheduleRepository = scheduleRepository;
        this.eventRepository = eventRepository;
    }

    public String addSchedule(
            ScheduleRequest request) {

        if (request.getSessionTitle() == null
                || request.getSessionTitle().isBlank()) {

            throw new RuntimeException(
                    "Session title is required");
        }

        if (request.getEndTime()
                .isBefore(request.getStartTime())) {

            throw new RuntimeException(
                    "End time must be after start time");
        }

        Event event =
                eventRepository.findById(
                                request.getEventId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"));

        Schedule schedule =
                Schedule.builder()
                        .sessionTitle(
                                request.getSessionTitle())
                        .speakerName(
                                request.getSpeakerName())
                        .description(
                                request.getDescription())
                        .startTime(
                                request.getStartTime())
                        .endTime(
                                request.getEndTime())
                        .createdAt(
                                LocalDateTime.now())
                        .event(event)
                        .build();

        scheduleRepository.save(schedule);

        return "Schedule created successfully";
    }

    public List<Schedule> getSchedules(
            Long eventId) {

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Event not found"));

        return scheduleRepository.findByEvent(event);
    }

    public String updateSchedule(
            Long scheduleId,
            ScheduleRequest request) {

        Schedule schedule =
                scheduleRepository.findById(scheduleId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Schedule not found"));

        if (request.getEndTime()
                .isBefore(request.getStartTime())) {

            throw new RuntimeException(
                    "End time must be after start time");
        }

        schedule.setSessionTitle(
                request.getSessionTitle());

        schedule.setSpeakerName(
                request.getSpeakerName());

        schedule.setDescription(
                request.getDescription());

        schedule.setStartTime(
                request.getStartTime());

        schedule.setEndTime(
                request.getEndTime());

        scheduleRepository.save(schedule);

        return "Schedule updated successfully";
    }

    public String deleteSchedule(
            Long scheduleId) {

        Schedule schedule =
                scheduleRepository.findById(scheduleId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Schedule not found"));

        scheduleRepository.delete(schedule);

        return "Schedule deleted successfully";
    }

}