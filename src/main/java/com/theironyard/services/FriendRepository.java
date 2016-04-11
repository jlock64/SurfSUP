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
    List<User> findAllByFriendA (User user);

//    @Query(value = "SELECT * FROM friends WHERE user_a <> ?1", nativeQuery = true)
//    List<Friend> findAllWhereUserAEquals(User user);
//
//    @Query(value = "SELECT * FROM friends WHERE user_b <> ?1", nativeQuery = true)
//    List<Friend> findAllWhereUserBEquals(User user);
}
