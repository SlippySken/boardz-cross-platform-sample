using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
using System.Windows.Navigation;
using System.Windows.Shapes;
using BoardZWtfClient.Common;

namespace BoardZWtfClient
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private ObservableCollection<BoardGame.Api.Models.BoardGame> _boardGames;

        public ObservableCollection<BoardGame.Api.Models.BoardGame> BoardGames
        {
            get { return _boardGames ?? (_boardGames = new ObservableCollection<BoardGame.Api.Models.BoardGame>()); }
            set { _boardGames = value; }
        }

        public MainWindow()
        {
            InitializeComponent();
            DataContext = this;
        }

        private async void RequestDataClicked(object sender, RoutedEventArgs e)
        {
            var tokenService = new TokenService();

            if (String.IsNullOrEmpty(tokenService.GetAccessToken()))
            {
                var loginWindow = new LoginWindow();
                var windowResult = loginWindow.ShowDialog();
                if (windowResult == null || !windowResult.Value)
                {
                    return;
                }
            }

            var apiClient = new ApiService();
            var result = await apiClient.GetList();

            BoardGames.Clear();
            foreach (var boardGame in result)
            {
                Console.WriteLine(boardGame.Name);
                BoardGames.Add(boardGame);
            }
        }
    }
}
