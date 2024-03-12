package cdss.product.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ContactException extends RuntimeException {

    private CodeResponse codeResponse;

    public ContactException(CodeResponse codeResponse) {
        this.codeResponse = codeResponse;
    }

    public static final CodeResponse SUCCESS = new CodeResponse("SUCCESS", "SUCCESS", HttpStatus.OK);

    public static final CodeResponse JWT_EXPIRED = new CodeResponse("JWT-01", "Jwt expired", HttpStatus.UNAUTHORIZED);

    public static final CodeResponse JWT_INVALID = new CodeResponse("JWT-02", "Jwt invalid", HttpStatus.UNAUTHORIZED);

    public static final CodeResponse ERR_CONVERT_DTO_ENTITY_FAIL = new CodeResponse("RECORD-01", "Failed to convert contact",
            HttpStatus.INTERNAL_SERVER_ERROR);

    public static final CodeResponse CREATE_CONTACT_FAIL = new CodeResponse("RECORD-02", "Create Contact fail",
            HttpStatus.BAD_REQUEST);

    public static final CodeResponse CONTACT_NOT_FOUND = new CodeResponse("RECORD-03", "Cannot find contact",
            HttpStatus.NOT_FOUND);
}
