export const validateLoginForm = (email: string, password: string) => {

    const errors: { email?: string; password?: string } = {};
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email"
    }
  
    // Validate password (e.g., minimum 6 characters)
    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be atleast 6 characters"
    }
  
    return errors;
  };


  
  export const validateRegisterForm = (name: string, email: string, password: string,confirmPassword:string) => {
    const errors: { name?: string; email?: string; password?: string; confirmPassword?:string; title?: string; bio?: string } = {};
  
    if (!name.trim()) {
      errors.name = "Name is required"
    }
  
    if (!email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email format"
    }
  
    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password should be 6 characters long"
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required"
    } else if (confirmPassword.length < 6) {
      errors.confirmPassword = "Confirm password should be 6 characters long "
    }else if(confirmPassword!==password){
      errors.confirmPassword = "Confirm should match with entered password"
    }
  
    return errors;
  };

  export const addBlogForm = (formData:{title: string, content: string, imageUrl:File| null}, currentImageUrl?: string) => {
    const errors: { title?: string; content?: string; imageUrl?: string; } = {};
  
    if (!formData.title.trim()) {
      errors.title = "Title is required"
    }
  
    if (!formData.content.trim()) {
      errors.content = "Content is required"
    } else if (formData.content.length<10) {
      errors.content = "Content should be atleast 10 characters"
    }
    if (!formData.imageUrl && !currentImageUrl) {
        errors.imageUrl = "Image is required";
      } else if (typeof formData.imageUrl === 'string') {
        // If thumbnail is a URL, no need to validate type or size
      } else if (formData.imageUrl instanceof File) {
        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedTypes.includes(formData.imageUrl.type)) {
          errors.imageUrl = "Inavlid image format";
        }
        if (formData.imageUrl.size > 5 * 1024 * 1024) {
          errors.imageUrl = "Invalid image size";
        }
  
    }
    return errors;
  };
  