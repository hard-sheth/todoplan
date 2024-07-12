import { IsEmail, Validate } from "class-validator";
import { IsValidEmailConstraint } from "src/utils/emailvalidation";
import { IsDisposableMail } from "src/utils/is-email-disposable";

export class CreatePatientDto {
    @IsEmail()
    // @Validate(IsValidEmailConstraint)
    @IsDisposableMail()
    
    personalEmail: string;
}


// https://www.ipqualityscore.com/api/json/email/EVAC5BRS6XrBylsIYxzHBR6WfnQa8zIu/hardsheth17@mailinator.com


// https://www.ipqualityscore.com/api/json/phone/EVAC5BRS6XrBylsIYxzHBR6WfnQa8zIu/+91 9428663751


// https://www.ipqualityscore.com/api/json/ip/EVAC5BRS6XrBylsIYxzHBR6WfnQa8zIu/14.194.132.202?billing_address_1=1234 Muffin Lane&billing_address_2=suite 100&billing_city=Las Vegas&billing_region=NV&&billing_country=US&billing_postcode=12345


// https://ipqualityscore.com/api/json/ip/EVAC5BRS6XrBylsIYxzHBR6WfnQa8zIu/14.194.132.202







