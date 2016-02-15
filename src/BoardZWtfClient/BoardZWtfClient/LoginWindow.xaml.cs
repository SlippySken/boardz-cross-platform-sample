using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using BoardZWtfClient.Common;

namespace BoardZWtfClient
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        public LoginWindow()
        {
            InitializeComponent();
        }

        private async void LoginButtonClicked(object sender, RoutedEventArgs e)
        {
            var tokenService = new TokenService();

            try
            {
                await tokenService.RequestAccessToken(UsernameInput.Text, PasswordInput.Password);

                DialogResult = true;
                Close();
            }
            catch
            {
                // Schade.
            }
        }
    }
}
