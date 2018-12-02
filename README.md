# Tunihack4

Routes of the backend server

    GET '/'                         => just for testing if api is accessible
    GET '/metadata'                 => get municipalities of each governorate
    GET '/governorates              => all governorates
    GET '/governorates/:g_name      => governorate by name
    GET '/governorates/:g_name/municipalities           => municipalities by governorate
    GET '/governorates/:g_name/municipalities/:m_name'  => municipality by governorate by name
    GET '/projects/governorates/:g_name/municipalities/:m_name'  => municipality projects by governorate by name
