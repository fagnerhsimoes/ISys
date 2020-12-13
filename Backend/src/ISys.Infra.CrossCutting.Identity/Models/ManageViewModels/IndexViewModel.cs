﻿using System.ComponentModel.DataAnnotations;

namespace ISys.Infra.CrossCutting.Identity.Models.ManageViewModels
{
    public class IndexViewModel
    {
        public string Username { get; set; }

        public bool IsEmailConfirmed { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        [Display(Name = "Número do Telefone")]
        public string PhoneNumber { get; set; }

        public string StatusMessage { get; set; }
    }
}
