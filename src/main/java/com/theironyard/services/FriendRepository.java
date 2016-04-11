package com.theironyard.services;

import com.theironyard.entities.Friend;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by noellemachin on 4/11/16.
 */
public interface FriendRepository extends CrudRepository<Friend, Integer> {
}
