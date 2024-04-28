type CustomClaims = {
  organizer?: boolean;
};

type Roles = keyof CustomClaims;

export { CustomClaims, Roles };
