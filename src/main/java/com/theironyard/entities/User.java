package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by keatonfoster on 4/6/16.
 */
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String firstName;

    @Column(nullable = false)
    String lastName;

    @Column(nullable = false, unique = true)
    String email;

    @Column(nullable = false, unique = true)
    String phone;

//    @Column(nullable = false)
//    // defaultLocation.. unsure how to do this right now

    @Column(nullable = false, unique = true)
    String userName;

    @Column(nullable = false)
    String password;

//    @Column(nullable = false)
//    // profileImage
}
