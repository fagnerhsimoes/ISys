using System;
using System.Collections.Generic;
using System.Text;

namespace ISys.Application.ViewModels
{
    public class ResultViewModel
    {
        public bool   success { get; set; }
        public string errors  { get; set; }
        public object data    { get; set; }
    }
}

