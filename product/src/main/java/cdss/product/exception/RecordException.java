package cdss.product.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class RecordException extends RuntimeException {

    private CodeResponse codeResponse;

    public RecordException(CodeResponse codeResponse) {
        this.codeResponse = codeResponse;
    }

    public static final CodeResponse SUCCESS = new CodeResponse("SUCCESS", "SUCCESS", HttpStatus.OK);

    public static final CodeResponse JWT_EXPIRED = new CodeResponse("JWT-01", "Jwt expired", HttpStatus.UNAUTHORIZED);

    public static final CodeResponse JWT_INVALID = new CodeResponse("JWT-02", "Jwt invalid", HttpStatus.UNAUTHORIZED);

    public static final CodeResponse ERR_CONVERT_DTO_ENTITY_FAIL = new CodeResponse("RECORD-01", "Failed to convert asset",
            HttpStatus.INTERNAL_SERVER_ERROR);

    public static final CodeResponse CREATE_RECORD_FAIL = new CodeResponse("RECORD-02", "Create Asset fail",
            HttpStatus.BAD_REQUEST);

    public static final CodeResponse RECORD_NOT_FOUND = new CodeResponse("RECORD-03", "Cannot find record",
            HttpStatus.NOT_FOUND);
}
