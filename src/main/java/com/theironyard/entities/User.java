package com.theironyard.entities;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by noellemachin on 4/6/16.
 */
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
}
