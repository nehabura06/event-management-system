package com.eventmanagement.backend.scheduler;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.entity.Registration;
import com.eventmanagement.backend.repository.EventRepository;
import com.eventmanagement.backend.repository.RegistrationRepository;
import com.eventmanagement.backend.service.EmailService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class EventReminderScheduler {

    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;
    private final EmailService emailService;

    public EventReminderScheduler(
            EventRepository eventRepository,
            RegistrationRepository registrationRepository,
            EmailService emailService) {

        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
        this.emailService = emailService;
    }

    @Scheduled(cron = "0 0 9 * * *",
            zone = "Asia/Kolkata")
//      @Scheduled(cron = "0 */1 * * * *",
//              zone = "Asia/Kolkata")
    public void sendReminders() {

          System.out.println("Scheduler running...");
        LocalDate tomorrow =
                LocalDate.now().plusDays(1);

        List<Event> events =
                eventRepository.findAll();

        for (Event event : events) {

            if (event.getDate()
                    .equals(tomorrow)) {

                List<Registration> registrations =
                        registrationRepository
                                .findByEvent(event);

                for (Registration registration :
                        registrations) {

                    emailService.sendReminderEmail(
                            registration.getUser()
                                    .getEmail(),

                            event.getTitle(),

                            event.getDate()
                                    .toString(),

                            event.getVenue()
                    );
                }
            }
        }
    }
}