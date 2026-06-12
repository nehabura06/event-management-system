package com.eventmanagement.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.eventmanagement.backend.service.EmailService;


@RestController
@RequestMapping("/api/test")
public class TestController {

    private final EmailService emailService;

    public TestController(EmailService emailService) {
        this.emailService = emailService;
    }
    @GetMapping()
    public String test() {
        return "JWT Authentication Working";
    }

    @GetMapping("/email")
    public String testEmail() {

        emailService.sendTestEmail();

        return "Email sent successfully";
    }
}