package com.theironyard.services;

import com.theironyard.entities.Join;
import com.theironyard.entities.Sesh;
import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by noellemachin on 4/8/16.
 */
public interface JoinRepository extends CrudRepository<Join, Integer> {
    List<User> findAllBySesh(Sesh sesh);
}
