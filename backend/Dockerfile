# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Copy SSL certificate and key into the container. Adjust the paths as necessary.
# Ensure these files are in your Docker build context (i.e., the directory where you run `docker build`).
COPY ./ssl/cert.pem /usr/src/app/ssl/cert.pem
COPY ./ssl/key.pem /usr/src/app/ssl/key.pem


# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches with SSL support
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--ssl-keyfile", "/usr/src/app/ssl/key.pem", "--ssl-certfile", "/usr/src/app/ssl/cert.pem"]
