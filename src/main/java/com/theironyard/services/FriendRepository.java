package com.theironyard.services;

import com.theironyard.entities.Friend;
import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by noellemachin on 4/11/16.
 */
public interface FriendRepository extends CrudRepository<Friend, Integer> {
    List<User> findAllByUser (User user);
}
