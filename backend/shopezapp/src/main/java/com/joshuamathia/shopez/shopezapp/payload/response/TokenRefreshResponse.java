package com.joshuamathia.shopez.shopezapp.payload.response;

public class TokenRefreshResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    public TokenRefreshResponse(String accessToken, String refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
}
    public String getAccessToken(){
        return accessToken;
    }
    void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    public String getRefreshToken(){
        return refreshToken;
    }
    void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    public String getTokenType(){
        return tokenType;
    }
    void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}