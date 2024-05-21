package cdss.product;

import cdss.product.controller.JwtAuthenticationController;
import cdss.product.payload.request.LoginRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.springSecurity;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductApplicationTests {

//	@Autowired
//	ApplicationContext context;
//
//	WebTestClient rest;

//	@BeforeEach
//	public void setup() {
//		this.rest = WebTestClient
//				.bindToApplicationContext(this.context)
//				// add Spring Security test Support
//				.apply(springSecurity())
//				.configureClient()
//				.filter(basicAuthentication("user", "password"))
//				.build();
//	}

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

//	@Test
//	public void messageWhenNotAuthenticated() throws Exception {
//		this.rest
//				.get()
//				.uri("/message")
//				.exchange()
//				.expectStatus().isUnauthorized();
//	}

	@Test
	@WithMockUser(username = "user1", roles = "USER")
	public void testSecuredEndpointWithUser() throws Exception {
		// Act
		ResultActions result = mockMvc.perform(get("/secured"));

		// Assert
		result.andExpect(status().isOk())
				.andExpect(content().string("Secured Endpoint Accessed"))
				.andExpect(authenticated());
	}

	@Test
//	@WithMockUser(username = "hoanganh2", roles = { "PATIENT" })
	public void whenUserAccessLogin_shouldSucceed() throws Exception {
		Gson gson = new Gson();
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();


		mockMvc.perform(post("/api/auth/signin")
						.accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(gson.toJson(new LoginRequest("hoanganh2", "123456"))))
				.andExpect(status().isOk());
	}

	@Test
	public void whenUserAccessWithWrongCredentialsWithDelegatedEntryPoint_shouldFail() throws Exception {
//		RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(), "Authentication failed");
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
		mockMvc.perform(post("/api/auth/signin")
						.accept(MediaType.APPLICATION_JSON)
						.contentType(MediaType.APPLICATION_JSON)
						.content(ow.writeValueAsString(new LoginRequest("hoanganh2", "12345"))))
				.andExpect(status().isUnauthorized());
//				.andExpect(jsonPath("$.errorMessage", is(re.getErrorMessage())));
	}

	@Test
	public void testUnauthorizeException() throws Exception {
		// Act
		ResultActions result = mockMvc.perform(get("/contact"));

		// Assert
		result.andExpect(status().isUnauthorized());
	}

	@Test
	@WithMockUser(username = "user1", roles = "USER")
	public void testStaffEndpointWithRegularUser() throws Exception {
		// Act
		ResultActions result = mockMvc.perform(get("/contact"));

		// Assert
		result.andExpect(status().isForbidden());
	}

//	@Test
//	public void whenUserAccessWithWrongCredentialsWithDelegatedEntryPoint_shouldFail() throws Exception {
//		RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(), "Authentication failed");
//		mvc.perform(formLogin("/login").user("username", "admin")
//						.password("password", "wrong")
//						.acceptMediaType(MediaType.APPLICATION_JSON))
//				.andExpect(status().isUnauthorized())
//				.andExpect(jsonPath("$.errorMessage", is(re.getErrorMessage())));
//	}

}
