package com.theironyard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.User;
import com.theironyard.services.UserRepository;
import org.hibernate.validator.internal.constraintvalidators.bv.AssertTrueValidator;
import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpSession;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SurfSupApplication.class)
@WebAppConfiguration
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class SurfSupApplicationTests {

	@Autowired
	UserRepository users;

	@Autowired
	WebApplicationContext wap;

	MockMvc mockMvc;

	@Before
	public void before() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wap).build();
	}

	@Test
	public void test1createUser() throws Exception {
		User user = new User();
		user.setFirstName("Alice");
		user.setLastName("Malice");
		user.setEmail("yo@yo.com");
		user.setPhone("1234567890");
		user.setUsername("user");
		user.setPassword("password");

		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(user);
		mockMvc.perform(
				MockMvcRequestBuilders.post("/user")
						.content(json)
						.contentType("application/json")
		);

		Assert.assertTrue(users.count() == 1);
	}

	@Test
	public void test2login() throws Exception {
        User user = new User();
        user.setUsername("user");
        user.setPassword("password");

		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(user);
		ResultActions ra = mockMvc.perform(
				MockMvcRequestBuilders.post("/login")
						.content(json)
						.contentType("application/json")
		);
        MvcResult result = ra.andReturn();
        MockHttpServletRequest request = result.getRequest();
        HttpSession session = request.getSession();
		Assert.assertTrue(session.getAttribute("username") != null);
	}

//    @Test
//    public void test3

    @Test
    public void test10logout() throws Exception {
        ResultActions ra = mockMvc.perform(
                MockMvcRequestBuilders.post("/logout")

        );
        MvcResult result = ra.andReturn();
        MockHttpServletRequest request = result.getRequest();
        HttpSession session = request.getSession();
        Assert.assertTrue(session.getAttribute("username") == null);
    }

}
