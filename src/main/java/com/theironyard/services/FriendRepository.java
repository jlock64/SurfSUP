package com.theironyard.services;

import com.theironyard.entities.Friend;
import com.theironyard.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by noellemachin on 4/11/16.
 */
public interface FriendRepository extends CrudRepository<Friend, Integer> {
    List <Friend> findAllByFriendA (User user);
    Friend findFirstByFriendAAndFriendB (User userA, User userB);
    Friend findFirstByFriendBAndFriendA (User userA, User userB);
}
