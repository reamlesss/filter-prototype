
export class User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    isActive: boolean;
    zcmRole: string;
    admRole: string;
    lastUpdated: string;
    updateUser: string;
    comsId: string;
  
    constructor(
      userId: string,
      firstName: string,
      lastName: string,
      email: string,
      location: string,
      isActive: boolean,
      zcmRole: string,
      admRole: string,
      lastUpdated: string,
      updateUser: string,
      comsId: string
    ) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.location = location;
      this.isActive = isActive;
      this.zcmRole = zcmRole;
      this.admRole = admRole;
      this.lastUpdated = lastUpdated;
      this.updateUser = updateUser;
      this.comsId = comsId;
    }

    toString(): string {
        return `
          User ID: ${this.userId}
          First Name: ${this.firstName}
          Last Name: ${this.lastName}
          Email: ${this.email}
          Location: ${this.location}
          Active: ${this.isActive}
          ZCM Role: ${this.zcmRole}
          Admin Role: ${this.admRole}
          Last Updated: ${this.lastUpdated}
          Updated By: ${this.updateUser}
          COMS ID: ${this.comsId}
        `;
      }
  }
  