//package com.eventmanagement.backend.repository;
//
//import com.eventmanagement.backend.entity.Event;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface EventRepository extends JpaRepository<Event, Long> {
//}

package com.eventmanagement.backend.repository;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.enums.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository
        extends JpaRepository<Event, Long> {

    List<Event> findByTitleContainingIgnoreCase(
            String title);

    List<Event> findByCategory(
            EventCategory category);

    List<Event> findByVenueContainingIgnoreCase(
            String venue);

    List<Event> findByDateAfter(
            LocalDate date);
}