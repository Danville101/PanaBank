package util

import (
	"errors"
	"fmt"
	"os"

	"github.com/golang-jwt/jwt"
)

type Payload struct {
	Email	string

}





func SignJWT(p *Payload) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		 "email": p.Email,
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	

	return tokenString, err;
}






func Verify(token string) (*Payload, error) {
	parsed, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRET")), nil
	})
	
	if err != nil {
		return nil, err
	}

	// Parsing token claims
	claims, ok := parsed.Claims.(jwt.MapClaims)
	if !ok {
		return nil, err
	}

	// Getting Email, it's an interface{} so I need to cast it to string
	emailClaim, ok := claims["email"]
	if !ok {
		return nil, errors.New("something went wrong")
	}
	



	return &Payload{
		Email: emailClaim.(string) ,

	}, nil
}

