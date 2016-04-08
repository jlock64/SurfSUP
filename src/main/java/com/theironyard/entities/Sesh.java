package com.theironyard.entities;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Calendar;

/**
 * Created by keatonfoster on 4/7/16.
 */
@Entity
@Table(name = "seshs")
public class Sesh {
    @Id
    @GeneratedValue
    int id;

    @ManyToOne
    User user;

    @Column(nullable = false)
    Boolean isSurf;
    // true means surf session, false means sup session

//    @Column(nullable = false)
//    DayOfWeek day;

    @Column(nullable = false)
    LocalDateTime time;
}
