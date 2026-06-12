package com.eventmanagement.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRegistrationEmail(
            String toEmail,
            String eventTitle,
            String eventDate,
            String venue) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "Event Registration Successful");

        message.setText(
                "Hello,\n\n" +
                        "You have successfully registered for:\n\n" +
                        "Event: " + eventTitle + "\n" +
                        "Date: " + eventDate + "\n" +
                        "Venue: " + venue + "\n\n" +
                        "Thank you."
        );

        mailSender.send(message);
    }

    public void sendCancellationEmail(
            String toEmail,
            String eventTitle) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "Event Registration Cancelled");

        message.setText(
                "Hello,\n\n" +
                        "Your registration for '" +
                        eventTitle +
                        "' has been cancelled.\n\n" +
                        "Thank you."
        );

        mailSender.send(message);
    }

    public void sendReminderEmail(
            String toEmail,
            String eventTitle,
            String eventDate,
            String venue) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject("Event Reminder");

        message.setText(
                "Hello,\n\n" +
                        "Reminder: Your event '" +
                        eventTitle +
                        "' starts tomorrow.\n\n" +
                        "Date: " + eventDate + "\n" +
                        "Venue: " + venue + "\n\n" +
                        "See you there!"
        );

        mailSender.send(message);
    }
    public void sendTestEmail() {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo("nehabura06@gmail.com");
        message.setSubject("Spring Boot Email Test");
        message.setText("Congratulations! Email sending is working.");

        mailSender.send(message);
    }
}