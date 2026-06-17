package com.eventmanagement.backend.repository;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.enums.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface EventRepository
        extends JpaRepository<Event, Long> {

    @Query("""
       SELECT e FROM Event e
       WHERE e.date > :today
       AND LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
       """)
    List<Event> searchUpcomingByTitle(
            @Param("keyword") String keyword,
            @Param("today") LocalDate today);

    @Query("""
       SELECT e FROM Event e
       WHERE e.date > :today
       AND LOWER(e.venue) LIKE LOWER(CONCAT('%', :keyword, '%'))
       """)
    List<Event> searchUpcomingByVenue(
            @Param("keyword") String keyword,
            @Param("today") LocalDate today);

    List<Event> findByCategoryAndDateAfter(
            EventCategory category,
            LocalDate date);

    List<Event> findByTitleContainingIgnoreCase(
            String title);

    List<Event> findByCategory(
            EventCategory category);

    List<Event> findByVenueContainingIgnoreCase(
            String venue);

    List<Event> findByDateAfter(
            LocalDate date);
    List<Event> findByDateGreaterThanEqual(
            LocalDate date);

    List<Event> findByCreatedBy(
            User user);}