// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Client" file="NotificationService.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Client.Services;

public class NotificationService
{
    private readonly Queue<string> _notifications = new ();

    public bool HasNotification => _notifications.Count > 0;

    public string NextNotification => _notifications.Dequeue();

    public event EventHandler? NewNotification;

    public void Add(string message)
    {
        _notifications.Enqueue(message);

        NewNotification?.Invoke(this, EventArgs.Empty);
    }
}