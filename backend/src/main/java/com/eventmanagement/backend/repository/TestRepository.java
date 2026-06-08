package com.eventmanagement.backend.repository;

import com.eventmanagement.backend.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Long> {

}