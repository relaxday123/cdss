package cdss.product.config;

import cdss.product.exception.*;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestControllerAdvice
@AllArgsConstructor
public class ControllerExceptionHandler {

	private static final Logger logger = LoggerFactory.getLogger(ControllerExceptionHandler.class);

//	@Override
//	protected ResponseEntity<Object> handleExceptionInternal(Exception exception, Object body, HttpHeaders headers,
//															 HttpStatus status, WebRequest request) {
//		var apiError = Objects.isNull(body) ? new ApiError(status, exception.getMessage()) // <--
//				: body;
//		return super.handleExceptionInternal(exception, apiError, headers, status, request);
//	}
//
//	@ExceptionHandler(NotFoundException.class)
//	public ResponseEntity handleNotFoundException(NotFoundException ex, WebRequest request) {
//		Map<String, Object> body = new LinkedHashMap<>();
//		body.put("timestamp", LocalDateTime.now());
//		body.put("message", ex.getMessage());
//		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
//	}
//
//	@Override
//	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
//																  HttpStatus status, WebRequest request) {
//		Map<String, Object> body = new LinkedHashMap<>();
//		body.put("timestamp", LocalDate.now());
//		body.put("status", status.value());
//		List<String> errors = ex.getBindingResult().getFieldErrors().stream().map(x -> x.getDefaultMessage())
//				.collect(Collectors.toList());
//		body.put("errors", errors);
//		logger.warn(errors.toString());
//
//		return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
//	}
//
//	@ExceptionHandler(UserException.class)
//	public ResponseEntity handleUrlException(UserException userException) {
//		logger.error(userException.getCodeResponse().getMessage());
//		return new ResponseEntity<>(userException.getCodeResponse().getMessage(),
//				userException.getCodeResponse().getStatus());
//	}
//
//	@ExceptionHandler(IllegalArgumentException.class)
//	public ResponseEntity illegalArgumentExceptionHandler(IllegalArgumentException ex, WebRequest request) {
//		logger.error(ex.getMessage());
//		return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//
//	@ExceptionHandler(ExpiredJwtException.class)
//	public ResponseEntity expiredJwtExceptionHandler(ExpiredJwtException ex, WebRequest request) {
//		logger.error(ex.getMessage());
//		return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.UNAUTHORIZED);
//	}

	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ErrorMessage resourceNotFoundException(NotFoundException ex, WebRequest request) {
		ErrorMessage message = new ErrorMessage(
				HttpStatus.NOT_FOUND.value(),
				new Date(),
				ex.getMessage(),
				request.getDescription(false));

		return message;
	}

	@ExceptionHandler(RecordException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ErrorMessage recordNotFoundException(RecordException ex, WebRequest request) {
		ErrorMessage message = new ErrorMessage(
				HttpStatus.NOT_FOUND.value(),
				new Date(),
				ex.getCodeResponse().getMessage(),
				request.getDescription(false));

		return message;
	}

	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorMessage illegalArgumentException(IllegalArgumentException ex, WebRequest request) {
		ErrorMessage message = new ErrorMessage(
				HttpStatus.INTERNAL_SERVER_ERROR.value(),
				new Date(),
				ex.getMessage(),
				request.getDescription(false));

		return message;
	}

	@ExceptionHandler(ExpiredJwtException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public ErrorMessage expiredJwtException(ExpiredJwtException ex, WebRequest request) {
		ErrorMessage message = new ErrorMessage(
				HttpStatus.BAD_REQUEST.value(),
				new Date(),
				ex.getMessage(),
				request.getDescription(false));

		return message;
	}

//	@ExceptionHandler(Exception.class)
//	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
//	public ErrorMessage globalExceptionHandler(Exception ex, WebRequest request) {
//		ErrorMessage message = new ErrorMessage(
//				HttpStatus.INTERNAL_SERVER_ERROR.value(),
//				new Date(),
//				ex.getMessage(),
//				request.getDescription(false));
//
//		return message;
//	}
}
