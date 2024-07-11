package cdss.product.service;

import cdss.product.config.ControllerExceptionHandler;
import cdss.product.dto.RecordDTO;
import cdss.product.exception.ErrorMessage;
import cdss.product.exception.RecordException;
import cdss.product.mapper.RecordMapper;
import cdss.product.model.Record;
import cdss.product.repository.RecordRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RecordServiceTest {

	@Mock
	RecordService recordService;

	@Mock
	RecordMapper recordMapper;

	@Mock
	RecordRepository recordRepository;

	@Before("")
	public void setUp() throws Exception {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void whenGetAll_shouldReturnList() {
		// 1. create mock data
		List<Record> mockBooks = recordRepository.findAll();
//		for(int i = 0; i < 5; i++) {
//			mockBooks.add(new Record());
//		}

		// 2. define behavior of Repository
//		when(recordRepository.findAll()).thenReturn(mockBooks);

		// 3. call service method
		List<Record> actualBooks = recordService.getAllRecord().stream()
				.map(record -> recordMapper.convertToEntity(record))
				.collect(Collectors.toList());;

		// 4. assert the result
		assertThat(actualBooks.size()).isEqualTo(mockBooks.size());

		// 4.1 ensure repository is called
		verify(recordRepository).findAll();
	}

	@Test
	void testGetRecordById_RecordFound() {
		// Mocking dependencies
		RecordRepository recordRepository = mock(RecordRepository.class);
		RecordMapper recordMapper = mock(RecordMapper.class);

		// Mocking data
		Long recordId = 6715L;
		Record record = new Record(); // Assuming Record is your entity class
		RecordDTO expectedRecordDTO = new RecordDTO(); // Assuming RecordDTO is your DTO class

		// Mocking findById to return the record
		when(recordRepository.findById(recordId)).thenReturn(Optional.of(record));

		// Mocking convertToDto to return the expectedRecordDTO
		when(recordMapper.convertToDto(record)).thenReturn(expectedRecordDTO);

		// Performing the test
		assertDoesNotThrow(() -> {
			RecordDTO result = recordService.getRecordById((long) 6714);
			assertNotNull(result); // Ensure that the result is not null
			assertEquals(expectedRecordDTO, result);
		});

		// Verifying that findById and convertToDto methods were called
		verify(recordRepository, times(1)).findById(recordId);
		verify(recordMapper, times(1)).convertToDto(record);
	}


	@Test
	void testHandleRecordException_RecordNotFound() {
		// Mocking dependencies
		ControllerExceptionHandler exceptionHandler = new ControllerExceptionHandler();
		WebRequest request = mock(WebRequest.class);

		// Mocking data
		Long recordId = 1L;
		RecordException exception = new RecordException(RecordException.RECORD_NOT_FOUND);

		// Performing the test
		ErrorMessage responseEntity = exceptionHandler.recordNotFoundException(exception, request);

		// Verifying the HTTP status code
		assertEquals(HttpStatus.NOT_FOUND.value(), responseEntity.getStatusCode());

		// Verifying the response body (you might need to adjust this based on your actual response format)
		assertEquals("Cannot find record", responseEntity.getMessage());
	}

	@Test
	void testHandleRecordException_RecordNotFound1() {
		// Mocking dependencies
		ControllerExceptionHandler exceptionHandler = new ControllerExceptionHandler();
		RecordException exception = new RecordException(RecordException.RECORD_NOT_FOUND);
		WebRequest request = mock(WebRequest.class);

		// Performing the test
		ErrorMessage errorMessage = exceptionHandler.recordNotFoundException(exception, request);

		// Verifying the fields in the ErrorMessage object
		assertEquals(HttpStatus.NOT_FOUND.value(), errorMessage.getStatusCode());
		assertNotNull(errorMessage.getTimestamp());
		assertEquals(exception.getCodeResponse().getMessage(), errorMessage.getMessage());
		assertEquals(request.getDescription(false), errorMessage.getDescription());
	}
}
