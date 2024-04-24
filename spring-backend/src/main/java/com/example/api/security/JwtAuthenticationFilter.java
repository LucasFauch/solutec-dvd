package com.example.api.security;

import com.example.api.models.user.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JwtAuthenticationFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws ServletException, IOException {
        if(!((HttpServletRequest)req).getRequestURI().startsWith("/auth")){
            String userId = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
            req.setAttribute("userId", userId);
        }
        chain.doFilter(req, res);
    }

}
